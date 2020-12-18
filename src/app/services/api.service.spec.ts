import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { TestBase } from 'src/test/testBase';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const mockEnvironment = TestBase.getMockEnvironment();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EnvironmentService, useValue: mockEnvironment }, ApiService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET request to randomPtsPhxUrl', inject(
    // Inject HttpTestingController to create a mock httpClient instance.
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, apiService: ApiService) => {
      // Arrange
      const numPoints = 100;
      const mockParams = new HttpParams().set('numPoints', numPoints.toString());
      const mockResponse: Array<IMapPoint> = TestBase.getIMapPointArray();

      // Act
      apiService.getRandomPointsInPhx(numPoints).subscribe((response) => {
        expect(response).toBe(mockResponse);
      });

      // Create a request using the mock HttpClient client, calling the mockUrl with mockParams and mockHeaders.
      const req = httpMock.expectOne([service.environment.randomPtsPhxUrl, mockParams.toString()].join('?'));

      // Assert
      // Expect the request made by the mock HttpClient client to be a GET request.
      expect(req.request.method).toEqual('GET');

      // Set mockResponse to be returned by the request.
      req.flush(mockResponse);
    }
  ));
});
