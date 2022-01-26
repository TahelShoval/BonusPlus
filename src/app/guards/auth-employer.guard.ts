import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployerGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const typeEntry = localStorage.getItem('typeEntry');
    if (typeEntry) {
      if (typeEntry == "employer") {
        return true;
      }
    }
    this.router.navigate(['/management-entry'])
    return false;
  }

}
