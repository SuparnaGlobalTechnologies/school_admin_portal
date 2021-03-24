import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
const API_URL = localStorage.getItem('ServerUrl');
const token = localStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthenticated: any;
  token: any;
  screens: any;
  items = [];
  private REST_API_SERVER = localStorage.getItem('ServerUrl');
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json; charset=utf-8'
    }),
  };

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
   // const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
   }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

     console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }

    return throwError(error.error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // public Authenticate(data){
  //   return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
  // }

  public Login(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/authenticate`;
    return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public ChangePassword(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/changePassword`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetCustomer(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getCustomer/`+ data ;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }
  public UpdateCustomer(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/updateCustomer`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetRole(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getRole/`+ data ;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }
  public UpdateRole(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/updateRole`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }
  public GetScreens(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getScreens`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetRoles(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getRoles`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CreateRole(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createRole`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public getRoleScreens(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getScreensByRole/` + data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }


  public GetUsers(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getUsers`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CreateEmp(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createEmployee`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CheckMailExists(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/checkMailExists/` + data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CheckPhoneExists(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/CheckPhoneExists/` + data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetUserDetails(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getUser/`+ data ;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public updateEmployee(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/updateUser`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CheckCliMailExists(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/checkCliMailExists/` + data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CheckCliPhoneExists(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/CheckCliPhoneExists/` + data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CreateClient(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createClient`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetClients(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getClients`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetClientDetails(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getClientDetails/`+ data ;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetStatusList(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getClientStatusList/`
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public updateClient(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/updateClientDetails`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public Forgot(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/forgotPassword`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }


  public GetScreensByRole(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getScreensByRole/`+ data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public SetScreens(data){
    console.log(data)
    this.items.push(data);
    console.log(this.items)
  }

  public GetAllowedScreens(){
    console.log(this.items);
    return this.items;
  }

  public GetQuizes(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getQuizes`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetBranches(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getBranches`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CreateBranch(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createBranch`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetBranchDetails(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getBranchDetails/`+ data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public updateBranch(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/updateBranchDetails`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetGrades(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getGrades`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public CreateGrade(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createGrade`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetGradeDetails(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/GetGradeDetails/`+ data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public updateGrade(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/updateGradeDetails`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }


  public CreateStudent(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/createStudent`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetStudents(): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getStudents`;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public updateStudent(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/updateStudentDetails`;
   return this.http.post(url, data, {headers})
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

  public GetStudentDetails(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' }; ;
    const url = `${API_URL}client/getStudentDetails/`+ data;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }


  public GetGrade(data): Observable<any> {
    const headers = { 'Authorization': 'Bearer' + token, 'Content-Type': 'application/json; charset=utf-8' };
    const url = `${API_URL}client/getGrade/`+ data ;
    return this.http.get(url)
      .pipe(map(this.extractData),
        catchError(this.handleError),
      );
  }

}
