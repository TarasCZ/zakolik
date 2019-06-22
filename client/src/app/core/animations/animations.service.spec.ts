import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  let service: AnimationsService;

  beforeEach(() => {
    service = new AnimationsService();
  });

  it('should set route animation type to "NONE" by default', () => {
    expect(AnimationsService.isRouteAnimationsType('NONE')).toBe(true);
  });

  it('should set route animation type to "ALL"', () => {
    service.updateRouteAnimationType({
      pageAnimations: true,
      elementsAnimations: true
    });
    expect(AnimationsService.isRouteAnimationsType('ALL')).toBe(true);
  });

  it('should set route animation type to "PAGE"', () => {
    service.updateRouteAnimationType({
      pageAnimations: true,
      elementsAnimations: false
    });
    expect(AnimationsService.isRouteAnimationsType('PAGE')).toBe(true);
  });

  it('should set route animation type to "ELEMENTS"', () => {
    service.updateRouteAnimationType({
      pageAnimations: false,
      elementsAnimations: true
    });
    expect(AnimationsService.isRouteAnimationsType('ELEMENTS')).toBe(true);
  });
});
