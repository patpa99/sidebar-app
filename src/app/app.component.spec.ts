import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {IconsModule} from './icons.module';

describe('Sidebar App', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, IconsModule],
      declarations: [AppComponent],
    }).compileComponents();
    // To create the Sidebar App before each test
    fixture = TestBed.createComponent(AppComponent);
  });

  // To verify that the Sidebar App was created
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have as title 'sidebar'", () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sidebar');
  });

  it("should render 'Pages' as text at the top of the sidebar", () => {
    fixture.detectChanges();
    const pageTitle = fixture.debugElement.query(By.css('#pageTitle'));
    expect(pageTitle.nativeElement.textContent.trim()).toBe('Pages');
  });
});
