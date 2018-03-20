import { Component, OnInit } from '@angular/core';
import { helperList } from '../../assets/helper/helperList';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {
  helperList = helperList;
  constructor() { }

  ngOnInit() {
  }

}
