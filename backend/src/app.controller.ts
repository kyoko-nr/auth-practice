import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import * as admin from 'firebase-admin';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get("/hello")
  getHello(): {data: string} {
    const hello = this.appService.getHello()
    return {data: hello};
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/admin/health')
  getAdminHealth(): { status: string } {
    return { status: 'ok' };
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('/admin/users/:uid/role')
  async setUserRole(
    @Param('uid') uid: string,
    @Body() body: { role: 'admin' | 'user' },
    @Req() req: any,
  ): Promise<{ ok: true; uid: string; role: 'admin' | 'user' }>{
    const role = body?.role;
    if (role !== 'admin' && role !== 'user') {
      throw new BadRequestException('Invalid role');
    }
    const actorUid = req?.user?.uid;
    const actorEmail = req?.user?.email;
    const ip = req?.ip;

    this.logger.log(`[ROLE_CHANGE:REQUEST] actor=${actorUid ?? 'unknown'} email=${actorEmail ?? 'unknown'} target=${uid} role=${role} ip=${ip ?? 'unknown'}`);
    try {
      await admin.auth().setCustomUserClaims(uid, { role });
      this.logger.log(`[ROLE_CHANGE:SUCCESS] actor=${actorUid ?? 'unknown'} target=${uid} role=${role}`);
      return { ok: true, uid, role };
    } catch (e) {
      this.logger.error(`[ROLE_CHANGE:ERROR] actor=${actorUid ?? 'unknown'} target=${uid} role=${role} error=${(e as Error).message}`);
      throw e;
    }
  }
}
