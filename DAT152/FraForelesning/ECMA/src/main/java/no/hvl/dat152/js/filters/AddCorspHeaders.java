package no.hvl.dat152.js.filters;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;


@WebFilter("/webworker/*")
public class AddCorspHeaders implements Filter {
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, 
      FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.addHeader("Cross-Origin-Opener-Policy","same-origin");
        httpServletResponse.addHeader("Cross-Origin-Embedder-Policy","require-corp");
        chain.doFilter(request, response);
    }
}
