import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';

export class CustomWorld {
  browser!: Browser;
  page!: Page;
}

setWorldConstructor(CustomWorld);
