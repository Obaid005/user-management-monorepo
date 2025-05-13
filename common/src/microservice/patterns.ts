/**
 * User microservice command patterns
 */
export enum UserCommands {
  REGISTER_USER = 'register-user',
  GET_ALL_USERS = 'get-all-users',
  GET_USER_BY_ID = 'get-user-by-id',
  DELETE_USER_BY_ID = 'delete-user-by-id',
  UPDATE_USER_BY_ID = 'update-user-by-id',
}

/**
 * Create a pattern object for sending commands
 */
export const createPattern = (command: string) => ({ cmd: command }); 