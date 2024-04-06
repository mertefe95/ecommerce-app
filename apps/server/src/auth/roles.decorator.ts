import { Reflector } from '@nestjs/core';

import { Role } from '../interface/Role';

export const Roles = Reflector.createDecorator<Role[]>();
