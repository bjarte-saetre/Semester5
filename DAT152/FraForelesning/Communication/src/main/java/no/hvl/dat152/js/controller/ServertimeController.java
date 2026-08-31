package no.hvl.dat152.js.controller;

import java.util.Calendar;

import org.springframework.http.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import no.hvl.dat152.js.response.ServerResponse;
import no.hvl.dat152.js.response.ServertimeResponse;

@Controller
@RequestMapping(path = "/api")
public class ServertimeController {

    @GetMapping(path = "/servertime", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ServerResponse getServertime() {
        Calendar c = Calendar.getInstance();
        ServertimeResponse response = new ServertimeResponse();

        response.setResponseStatus(true);
        response.setServertime(c.getTimeInMillis());
        return response;
    }
}
