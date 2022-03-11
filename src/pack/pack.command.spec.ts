// REFERENCE(Integration examples): https://github.com/jmcdo29/nest-commander/tree/main/integration
import { TestingModule } from '@nestjs/testing'
import { CommandTestFactory } from 'nest-commander-testing'
import { AppModule } from '../app.module'
import { LogService } from '../common/common'

describe('PackCommand', () => {
  let commandModule: TestingModule
  let logService: LogService
  const exitMock: jest.Mock = jest.fn()
  const trueExit = process.exit

  beforeAll(async () => {
    commandModule = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile()
    logService = await commandModule.resolve(LogService)
    // eslint-disable-next-line functional/immutable-data
    process.exit = exitMock as never
  })

  afterEach(() => {
    exitMock.mockReset()
  })

  afterAll(() => {
    // eslint-disable-next-line functional/immutable-data
    process.exit = trueExit
  })

  it.each`
    command                                | expectedLogs
    ${String(['pack'])}                    | ${1}
    ${String(['run', '-m', '.alternate'])} | ${2}
  `(
    'should run the $command command',
    async ({ command, expectedLogs }: { readonly command: readonly string[]; readonly expectedLogs: number }) => {
      expect.assertions(1)
      const logSpy = jest.spyOn(logService.logger, 'log')
      await CommandTestFactory.run(commandModule, [...command])
      expect(logSpy).toHaveBeenCalledTimes(expectedLogs)
    }
  )
})
