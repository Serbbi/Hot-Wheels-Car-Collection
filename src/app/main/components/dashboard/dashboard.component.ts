import { Component } from '@angular/core';
import {CarsService} from "../../../services/cars.service";
import {Car} from "../../../models/car.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cars: Car[] = [];
  isVisible: boolean = false;
  public carToEdit?: Car;

  constructor(private CarsService: CarsService) {
    this.CarsService.cars.subscribe(cars => {
      this.cars = [...cars];
    });
  }

  delete(car: Car): void {
    this.CarsService.deleteCar(car);
  }

  showModal(car?: Car): void {
    this.isVisible = true;
    if(car) {
      this.carToEdit = car;
    }
  }

  hideModal(): void {
    this.isVisible = false;
    this.carToEdit = undefined;
  }

  onFormSubmit(): void {
    this.hideModal();
  }
}
