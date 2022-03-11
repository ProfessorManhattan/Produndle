import { Module } from '@nestjs/common'
import { CommonModule } from './common/common'
import { PackCommand } from './pack/pack.command'
import { UnPackCommand } from './unpack/unpack.command'

/**
 * Main app module
 */
@Module({
  controllers: [],
  imports: [CommonModule],
  providers: [PackCommand, UnPackCommand]
})
export class AppModule {}
