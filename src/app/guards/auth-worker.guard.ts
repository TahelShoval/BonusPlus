import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthWorkerGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(): boolean {
    const typeEntry = localStorage.getItem('typeEntry');
    if (typeEntry) {
      if (typeEntry == "worker") {
        return true;
      }
    }
    this.router.navigate(['/worker-entry'])
    return false;
  }
}
