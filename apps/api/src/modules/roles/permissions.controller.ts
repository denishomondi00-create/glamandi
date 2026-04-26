import { Controller, Get } from '@nestjs/common';
import { PERMISSIONS } from '../../common/constants/permissions.constants';

@Controller('permissions')
export class PermissionsController {
  @Get()
  findAll() {
    return Object.values(PERMISSIONS).map((key) => ({ key }));
  }
}
