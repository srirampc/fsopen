
//
// A solution for extending express Request object to
// set properties
// From here : https://stackoverflow.com/questions/37377731
//
declare module 'express-server-static-core' {
    interface Request {
        token: string
        user?: string
    }
}

// Currently not using tsconfig, but if it is required
//  - Update tsconfig as follows
//
// {
//     "compilerOptions": {
//         "typeRoots": ["./types"]
//     }
// }
