import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    throughput: String
    old_throughput: String;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.old_throughput = '';
        this.throughput = '10000';
        this.http.post(`/init`, {})
            .subscribe(
            res => {
                this.old_throughput = res['current_throughput'];
            }, err => {
                console.log(err);
            }
            );
    }

    updateThroughput = function () {
        this.old_throughput = this.throughput;
        this.http.post(`/throughput`, { throughput: this.throughput })
            .subscribe(
            res => { console.log(res); }, err => { console.log(err); }
            );
    };
}
