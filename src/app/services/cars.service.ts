import { Injectable } from '@angular/core';
import {Car} from "../models/car.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private _jsonURL = 'assets/garage.json';
  cars:BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.cars.next(data);
    });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  public deleteCar(car: Car) {
    let cars = this.cars.getValue();
    cars = cars.filter(c => c.name !== car.name);
    this.cars.next(cars);
  }

  public addCar(car: Car) {
    if(!car.name && !car.type) {
      console.log('invalid car');
      return;
    }
    let cars = this.cars.getValue();
    cars.push(car);
    this.cars.next(cars);
    console.log(this.cars.getValue());
  }

  public updateCar(carName: string, car: Car) {
    let cars = this.cars.getValue();
    const carIndex = cars.findIndex(c => c.name === carName);
    cars[carIndex] = car;
    this.cars.next(cars);
  }
}
