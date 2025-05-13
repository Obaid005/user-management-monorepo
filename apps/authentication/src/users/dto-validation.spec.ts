import { RegisterUserDto } from '@monorepo/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('DTO Validation', () => {
  describe('RegisterUserDto', () => {
    it('should validate a correct RegisterUserDto', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBe(0);
    });

    it('should fail with an invalid email', async () => {
      const dto = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123',
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });

    it('should fail with a missing email', async () => {
      const dto = {
        name: 'Test User',
        password: 'password123',
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });

    it('should fail with a missing name', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
    });

    it('should fail with a missing password', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
    });

    it('should fail with a short password', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
        password: '123', // Too short
      };

      const dtoObj = plainToInstance(RegisterUserDto, dto);
      const errors = await validate(dtoObj);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
    });
  });
}); 