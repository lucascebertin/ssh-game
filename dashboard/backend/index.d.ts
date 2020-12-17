// Type definitions for passport-local-token 1.0.1
// Project: https://github.com/jaredhanson/passport-local-token
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
// <reference types="passport"/>
declare module 'passport-local-token' {
  import { Strategy as PassportStrategy } from 'passport'
  import express from 'express'
  interface IStrategyOptions {
    token?: string
    session?: boolean
    passReqToCallback?: false
    tokenField?: string
  }
  interface IStrategyOptionsWithRequest {
    token?: string
    session?: boolean
    passReqToCallback: true
    tokenField?: string
  }
  interface IVerifyOptions {
    message: string
  }
  interface VerifyFunctionWithRequest {
    (
      req: express.Request,
      token: string,
      done: (error: any, user?: any, options?: IVerifyOptions) => void,
    ): void
  }
  interface VerifyFunction {
    (
      token: string,
      done: (error: any, user?: any, options?: IVerifyOptions) => void,
    ): void
  }
  class Strategy extends PassportStrategy {
    constructor(
      options: IStrategyOptionsWithRequest,
      verify: VerifyFunctionWithRequest,
    )
    constructor(options: IStrategyOptions, verify: VerifyFunction)
    constructor(verify: VerifyFunction)
    authenticate(req: express.Request, options?: Object): void
    name: string
  }
}
