import { Injectable } from '@angular/core';

@Injectable()
export class DragService {
  private zoneIds: Array<string> = []
  private availableZones: any = {}

  constructor() { }

  public startDrag(zoneIds: Array<string>) {
    this.zoneIds = zoneIds
    this.highLightAvailableZones()
  }

  public accepts(zoneId: string) {
    return this.zoneIds.indexOf(zoneId) > -1
  }

  public removeHighLightedAvailableZones() {
    console.log(this.zoneIds)
    if (this.zoneIds !== undefined) {
      this.zoneIds.forEach((zone: string) => {
        this.availableZones[zone].end()
      })
    }

  }

  public addAvailableZone(zoneId: string, obj: {begin: Function, end: Function}) {
    this.availableZones[zoneId] = obj
  }

  public removeAvailableZone(zoneId: string) {
    delete this.availableZones[zoneId]
  }

  private highLightAvailableZones() {
    this.zoneIds?.forEach((zone: string) => {
      this.availableZones[zone].begin()
    })
  }
}
