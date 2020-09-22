import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useToast, ToastProvider } from '../../hooks/ToastContext';

describe('Toast hook', () => {
  it('should be able to add a Toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const addToastSpy = jest.spyOn(result.current, 'addToast');

    act(() => {
      result.current.addToast({
        title: 'teste',
        type: 'error',
        description: 'teste',
      });
    });

    expect(addToastSpy).toHaveBeenCalledWith({
      title: 'teste',
      type: 'error',
      description: 'teste',
    });
  });
  it('should be able to remove a Toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });
    act(() => {
      result.current.addToast({
        title: 'teste',
        description: 'teste',
      });
    });

    const removeToastSpy = jest.spyOn(result.current, 'removeToast');

    act(() => {
      result.current.removeToast('asdasdasda');
    });

    expect(removeToastSpy).toHaveBeenCalledWith('asdasdasda');
  });
});
