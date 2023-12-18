import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GradingComponent } from './components/grading/grading.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, GradingComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should have Grading Application title initially', () => {
            expect(component.title).toEqual('Grading Application');
        });

        it('should have Grading Application h1 heading', () => {
            component.title = 'Grading Application';
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Grading Application');
        });
    });
});
