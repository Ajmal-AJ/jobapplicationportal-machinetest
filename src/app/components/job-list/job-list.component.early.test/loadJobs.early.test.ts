
import { of, throwError } from 'rxjs';
import { Job } from '../../../core/models/job.models';
import { JobListComponent } from '../job-list.component';


// Mock classes and interfaces
class MockJobService {
  getJobs = jest.fn();
}


describe('JobListComponent.loadJobs() loadJobs method', () => {
  let component: JobListComponent;
  let mockJobService: MockJobService;

  beforeEach(() => {
    mockJobService = new MockJobService() as any;
    component = new JobListComponent(mockJobService as any);
  });

  describe('Happy Paths', () => {
    it('should load jobs successfully and update jobList', () => {
      // Arrange
      const mockJobs: Job[] = [
        { id: 1, title: 'Developer', description: 'Develops software', location: 'Remote' },
        { id: 2, title: 'Designer', description: 'Designs interfaces', location: 'Onsite' }
      ];
      jest.mocked(mockJobService.getJobs).mockReturnValue(of(mockJobs) as any);

      // Act
      component.loadJobs();

      // Assert
      expect(component.isLoading).toBe(false);
      expect(component.jobList).toEqual(mockJobs);
    });

    it('should set isLoading to false after jobs are loaded', () => {
      // Arrange
      jest.mocked(mockJobService.getJobs).mockReturnValue(of([]) as any);

      // Act
      component.loadJobs();

      // Assert
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle error when job fetching fails', () => {
      // Arrange
      const error = new Error('Network error');
      jest.mocked(mockJobService.getJobs).mockReturnValue(throwError(() => error) as any);

      // Act
      component.loadJobs();

      // Assert
      expect(component.isLoading).toBe(true);
      expect(component.jobList).toEqual([]);
    });

    it('should log completion message when job fetching completes', () => {
      // Arrange
      jest.mocked(mockJobService.getJobs).mockReturnValue(of([]) as any);
      const consoleSpy = jest.spyOn(console, 'log');

      // Act
      component.loadJobs();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Job fetching completed.');
      consoleSpy.mockRestore();
    });
  });
});
