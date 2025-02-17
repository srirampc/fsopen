import bcrypt from 'bcrypt'
import { after, test, describe, before } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import helper from './test_helper'
import supertest from 'supertest'

import app from '../app'
const api = supertest(app)

before(async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    await helper.findOrCreateUser({
        ...helper.rootUser,
        passwordHash: passwordHash,
    })
})

describe('when there is already a user with id `root` in db', () => {
  test('usr creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()
    // console.log('ML Start', usersAtStart)
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // console.log('ML End', usersAtEnd)

    assert(!usersAtStart.map(u => u.username).includes(newUser.username))
    assert(usersAtEnd.map(u => u.username).includes(newUser.username))
  })

  test('user creation fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('user creation fails with small username/password < 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rt',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username/password should be atleast 3 chars long'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
   
  })
})



after(async () => {
  await Promise.all(
    helper.uapiTestUsers.map((ux) => {
      return helper.findAndDeleteUser(ux)
    }),
  )

  await mongoose.connection.close()
})
