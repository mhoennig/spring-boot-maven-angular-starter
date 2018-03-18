import {TestBed, ComponentFixture, async, fakeAsync} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const FAKE_HTTP_RESPONSE = { ping: 'pong' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    });
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // No outstanding requests?

    fixture.destroy();
    component = null;
  });

  // ------------------------------------------------

  it('should create the app', async(() => {

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    waitForMockHttpResponse();
  }));

  it('should have initial title', async(() => {
    expect(component.title).toEqual('Angular via SpringBoot');

    waitForMockHttpResponse();
  }));

  it('should render title from Angular component in a <h1> tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular via SpringBoot!');

    waitForMockHttpResponse();
  }));

  it('should render SpringBoot /api/ping response in a <p> tag', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    waitForMockHttpResponse();
    expect(compiled.querySelector('p').textContent).toContain('pong');
  }));

  // ------------------------------------------------

  function waitForMockHttpResponse() {
    const req = httpMock.expectOne('/api/ping');
    expect(req.request.method).toBe('GET');
    req.flush(FAKE_HTTP_RESPONSE);
    fixture.detectChanges();
  }
});
