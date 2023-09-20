import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarsService} from "../../../../services/cars.service";
import {Car} from "../../../../models/car.model";
import {CustomValidators} from "../../../../helpers/custom-validators";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit{
  validateForm!: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() carToEdit?: Car;

  constructor(private carsService: CarsService) {}

  submitForm(): void {
    this.formSubmitted.emit();
    console.log('submit', this.validateForm.value);
    if (this.carToEdit) {
      this.carsService.updateCar(this.carToEdit.name, this.validateForm.value as Car);
      return;
    }
    this.carsService.addCar(this.validateForm.value as Car);
  }

  close(): void {
    this.formSubmitted.emit();
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
    this.validateForm = new FormGroup({
      icon: new FormControl(this.carToEdit?.icon),
      name: new FormControl(this.carToEdit?.name, [Validators.required]),
      year: new FormControl(this.carToEdit?.year, [Validators.pattern('^[0-9]*$'), Validators.min(1900)]),
      type: new FormControl(this.carToEdit?.type, [Validators.required]),
      country: new FormControl(this.carToEdit?.country, [Validators.pattern('^[a-zA-Z ]*$')]),
      horsepower: new FormControl(this.carToEdit?.horsepower, [Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      zeroToHundred: new FormControl(this.carToEdit?.zeroToHundred, [Validators.pattern('[0-9]+([.][0-9]+)?'), Validators.min(0)]),
      favorite: new FormControl(this.carToEdit?.favorite)
    });
  }

  get icon(): FormControl {
    return this.validateForm.get('icon') as FormControl;
  }
  get name(): FormControl {
    return this.validateForm.get('name') as FormControl;
  }
  get year(): FormControl {
    return this.validateForm.get('year') as FormControl;
  }
  get type(): FormControl {
    return this.validateForm.get('type') as FormControl;
  }
  get country(): FormControl {
    return this.validateForm.get('country') as FormControl;
  }
  get horsepower(): FormControl {
    return this.validateForm.get('horsepower') as FormControl;
  }
  get zeroToHundred(): FormControl {
    return this.validateForm.get('zeroToHundred') as FormControl;
  }
  get favorite(): FormControl {
    return this.validateForm.get('favorite') as FormControl;
  }
}
