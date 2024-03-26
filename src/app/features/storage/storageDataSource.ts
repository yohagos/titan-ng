import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { StorageFull } from "src/app/core/models/storage.model";
import { StorageService } from "src/app/core/services/storage.service";


export class StorageDataSource implements DataSource<StorageFull> {
  private storageSubject = new BehaviorSubject<StorageFull[]>([])
  private loadingSubject = new BehaviorSubject<boolean>(false)
  public loading$ = this.loadingSubject.asObservable()

  private storageValueSum = 0

  constructor(
    private storageService: StorageService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<StorageFull[]> {
    return this.storageSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.loadingSubject.complete()
    this.storageSubject.complete()
  }

  loadInventory() {
    this.storageService.getInventory().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      storage => {
        this.storageSubject.next(storage)
        this.calculateCurrentValueOfStorage(storage)
      }
    )
  }

  calculateCurrentValueOfStorage(inventory: StorageFull[] | never[]) {
    if(inventory) {
      inventory.forEach((item: StorageFull) => {
        let price = item.pricePerBottle *  item.currentStock;
        this.storageValueSum  += price
      })
      this.storageService.setStorageValue(this.storageValueSum)
    }
  }

  getInventory() {
    return this.storageSubject.asObservable()
  }

}

