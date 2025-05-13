import { Param } from '@nestjs/common';
import { ParseObjectIdPipe } from '../pipes/object-id.pipe';

/**
 * Parameter decorator for automatically parsing and validating MongoDB ObjectIds
 * @param property The name of the parameter to extract from the request
 * @returns Properly typed and validated ObjectId
 * 
 * @example
 * @Get('users/:id')
 * findOne(@ObjectId('id') id: Types.ObjectId) {
 *   return this.usersService.findOne(id);
 * }
 */
export const ObjectId = (property: string) => 
  Param(property, ParseObjectIdPipe); 