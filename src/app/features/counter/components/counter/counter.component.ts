import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount, increment, decrement, reset } from '../../state';
import { CommonModule , AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  count$ = this.store.select(selectCount);

  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
