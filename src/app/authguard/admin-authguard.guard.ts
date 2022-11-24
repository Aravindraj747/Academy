import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardGuard implements CanActivate {
  constructor(private firestoreService: FirestoreService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.firestoreService.getAdminLogin() == 'true') {
      return true;
    }
    this.route.navigate(['adminlogin']);
    return false;
  }
  
}
