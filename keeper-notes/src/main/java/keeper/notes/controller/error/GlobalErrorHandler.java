package keeper.notes.controller.error;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

/*This annotation tells Spring that this is where to look for handling exceptions*/
@RestControllerAdvice
@Slf4j
public class GlobalErrorHandler {

	/*This is the handler for all NoSuchElementExceptions*/
		@ExceptionHandler(NoSuchElementException.class)
		@ResponseStatus(code = HttpStatus.NOT_FOUND)
		public Map<String, String> handleNoSuchElementException(NoSuchElementException ex){
			log.error("Exception: {}", ex.toString());
			Map<String, String> exceptionMap = new HashMap<>();
			exceptionMap.put("message", ex.toString());
			return exceptionMap;
		}
		
	/*This is the handler for all IllegalArgumentExceptions*/
		@ExceptionHandler(IllegalArgumentException.class)
		@ResponseStatus(code = HttpStatus.BAD_REQUEST)
		public Map<String, String> handleIllegalArgumentException(IllegalArgumentException ex){
			log.error("Exception: {}", ex.toString());
			Map<String, String> exceptionMap = new HashMap<>();
			exceptionMap.put("message", ex.toString());
			return exceptionMap;
		}
}
