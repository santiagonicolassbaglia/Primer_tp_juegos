import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
   expect(new Usuario('nombre','email' ,'clave')).toBeTruthy()
  });
});
