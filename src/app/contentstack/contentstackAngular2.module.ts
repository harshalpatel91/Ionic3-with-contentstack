import * as contentstack from 'contentstack/web';
import { NgModule ,InjectionToken,Injectable} from '@angular/core';

export const CsbaseAppConfigToken = new InjectionToken<string>('CsbaseAppConfigToken');

@Injectable() 
export class ContentstackService {
  Stack:any;
  ContentType:any;
  constructor(config){
    this.Stack = contentstack.Stack(config);
  }
}

export function _csbaseAppFactory(config){
  try {
      return  new ContentstackService(config)
  }
  catch (e) {
    return new ContentstackService(null)
  }
}

const ContentstackAppProvider = {
  provide: ContentstackService,
  useFactory:  _csbaseAppFactory,
  deps: [ CsbaseAppConfigToken ]
};

@NgModule({
  providers: [ ContentstackAppProvider ],
})
export class ContentstackAngular2Module {
  static initializeApp(config) {
    return {
      ngModule: ContentstackAngular2Module,
      providers: [
        { provide: CsbaseAppConfigToken, useValue: config }
      ]
    }
  }
}

