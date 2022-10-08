import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First Name Required"
        }),
        lastName: string({
            required_error: "Last Name Required"
        }),
        password: string({
            required_error: "password Required"
        }).min(6,"password is too short, min is six characters"),
       passwordConfirmation: string({
            required_error: "password confirmation required"
        }),
        email: string({
            required_error: "email is required"
        }).email("email is not valid"),
    }).refine(data=>data.password == data.passwordConfirmation, {
        message: "passwords do not match",
        path : ["passwordConfirmation"]
    })
})

export type createUserInput = TypeOf<typeof createUserSchema>['body']