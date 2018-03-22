package de.javagil.ngbootstarter.app.api;

import org.junit.Test;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.Assert.*;

public class PingResourceTest {

    private PingResource pingResource = new PingResource();

    @Test
    public void pingReturnsPong() {
        ResponseEntity<Map<String, String>> reply = pingResource.ping();
        assertEquals("pong", reply.getBody().get("ping"));
        assertEquals(1, reply.getBody().size());
    }
}