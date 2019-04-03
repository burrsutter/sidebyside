package com.acme.crud;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationListener {
    
    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        System.out.println(new SimpleDateFormat("HH:mm:ss.SSS").format(new Date()));
    }

}
