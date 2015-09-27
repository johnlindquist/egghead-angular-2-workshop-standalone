import {Component, View, NgFor, Pipe} from "angular2/angular2";
import {NgModel, DefaultValueAccessor} from "angular2/forms";
import people from "./people";

@Pipe({name: 'simpleOrderBy'})
class SimpleOrderBy {
    transform(value, key) {
        return value.sort(function (a, b) {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
    }

}

@Pipe({name: 'simpleSearch'})
class SimpleSearch {
    transform(value, [term, fields]) {
        term = term.toLowerCase();
        return value.filter(function (item) {
            return fields.some(function (key) {
                return item[key].toLowerCase().includes(term);
            });
        });

    }

}


@Component({
    selector: "my-awesome-component"
})
@View({
    directives: [NgFor, NgModel, DefaultValueAccessor],
    pipes: [SimpleOrderBy, SimpleSearch],
    template: `
        <div>
            <input type="text" [(ng-model)]="term">
            <table>
                <thead>
                    <th (click)="column = 'firstName'">First</th>
                    <th (click)="column = 'lastName'">Last</th>
                    <th (click)="column = 'age'">Age</th>
                </thead>
                <tr *ng-for="#person of people | simpleSearch:term:searchFields">
                    <td>{{person.firstName}}</td>
                    <td>{{person.lastName}}</td>
                    <td>{{person.age}}</td>
                </tr>
            </table>
        </div>
    `
})
export default class MyAwesomeComponent {
    people;
    column = "age";
    term = "";
    searchFields = ['firstName', 'lastName'];

    constructor() {
        this.people = people;
    }
}