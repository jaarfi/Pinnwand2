import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Pin} from '../pin';
import {PinComponent} from '../pin/pin.component';
import {GroupsComponent} from '../groups/groups.component';

@Component({
  selector: 'app-hauptmenu',
  templateUrl: './hauptmenu.component.html',
  styleUrls: ['./hauptmenu.component.css']
})
export class HauptmenuComponent implements OnInit {
  @ViewChild(PinComponent) pin;
  @ViewChild(GroupsComponent) groups;
  id: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    localStorage.removeItem('GruppenId');
    localStorage.removeItem('GruppenName');
    localStorage.removeItem('GruppenAdmin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  sortPins(sortBy): void {
    for (const pinIndex in this.pin.Pins) {
      for (const pinIndexAlt in this.pin.Pins) {
        const kek = Number(pinIndexAlt) + 1;
        if (kek < this.pin.Pins.length) {
          if (this.pin.Pins[pinIndexAlt][sortBy].localeCompare(this.pin.Pins[kek.toString()][sortBy]) === 1) {
            const tmp = JSON.parse(JSON.stringify(this.pin.Pins[pinIndexAlt]));
            this.pin.Pins[pinIndexAlt] = JSON.parse(JSON.stringify(this.pin.Pins[kek.toString()]));
            this.pin.Pins[kek.toString()] = JSON.parse(JSON.stringify(tmp));
          }
        }
      }
    }
  }
  updatePins(): void {
    this.pin.getPins();
  }

  changePassword(): void {

  }

}
