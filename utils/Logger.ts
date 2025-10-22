import { TestInfo } from '@playwright/test';

export enum LogLevel {
  INFO,
  WARN,
  ERROR,
  DEBUG
}

const logLevelNames = {
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.DEBUG]: 'DEBUG'
};

export class Logger {
  private static testInfo: TestInfo | null = null;

  public static setTestInfo(testInfo: TestInfo) {
    this.testInfo = testInfo;
  }

  private static log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const testTitle = this.testInfo ? `[${this.testInfo.title}] ` : '';
    const formattedMessage = `${timestamp} [${logLevelNames[level]}] ${testTitle}${message}`;
    
    switch (level) {
      case LogLevel.INFO:
        console.log(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...args);
        break;
    }
  }

  public static info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  public static warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  public static error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  public static debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }
} 