import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CarsService} from "../../../../services/cars.service";
import {Car} from "../../../../models/car.model";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit{
  validateForm!: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() carToEdit?: Car;

  constructor(private fb: UntypedFormBuilder,
              private carsService: CarsService) {}

  submitForm(): void {
    this.formSubmitted.emit();
    console.log('submit', this.validateForm.value);
    this.carsService.addCar(this.validateForm.value as Car);
    this.validateForm.reset();
    this.carToEdit = undefined;
  }

  close(): void {
    this.formSubmitted.emit();
    this.carToEdit = undefined;
    this.validateForm.reset();
    this.initializeForm();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.validateForm.get('icon')?.setValue(reader.result as string);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.validateForm = this.fb.group({
      icon: [this.carToEdit?.icon],
      name: [this.carToEdit?.name, [Validators.required]],
      type: [this.carToEdit?.type, [Validators.required]],
      year: [this.carToEdit?.year],
      country: [this.carToEdit?.country],
      horsepower: [this.carToEdit?.horsepower],
      zeroToHundred: [this.carToEdit?.zeroToHundred],
      favorite: [this.carToEdit?.favorite],
    });
  }
}
