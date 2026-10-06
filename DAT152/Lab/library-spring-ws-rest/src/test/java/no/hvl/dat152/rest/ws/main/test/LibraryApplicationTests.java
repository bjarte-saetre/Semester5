package no.hvl.dat152.rest.ws.main.test;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class LibraryApplicationTests {

    private static final String API = "/elibrary/api/v1";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void bookCanBeCreatedUpdatedAndDeletedByIsbn() throws Exception {
        String isbn = "test-isbn-98765";
        MvcResult created = mockMvc.perform(post(API + "/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"isbn":"test-isbn-98765","title":"First title","authors":[]}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isbn").value(isbn))
                .andReturn();

        long id = json(created).get("id").asLong();

        mockMvc.perform(put(API + "/books/" + isbn)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"New title","authors":[]}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.isbn").value(isbn))
                .andExpect(jsonPath("$.title").value("New title"));

        mockMvc.perform(get(API + "/books/" + isbn))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New title"));

        mockMvc.perform(delete(API + "/books/" + isbn))
                .andExpect(status().isNoContent());

        mockMvc.perform(get(API + "/books/" + isbn))
                .andExpect(status().isNotFound());

        mockMvc.perform(delete(API + "/books/" + isbn))
                .andExpect(status().isNotFound());

        mockMvc.perform(put(API + "/books/missing-isbn")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"Missing","authors":[]}
                                """))
                .andExpect(status().isNotFound());
    }

    @Test
    void authorEndpointsShowBooksAndSupportCreateAndUpdate() throws Exception {
        MvcResult seededBook = mockMvc.perform(get(API + "/books/abcde1234"))
                .andExpect(status().isOk())
                .andReturn();
        int publishedAuthorId = json(seededBook).get("authors").get(0).get("authorId").asInt();

        mockMvc.perform(get(API + "/authors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].authorId", hasItem(publishedAuthorId)));

        mockMvc.perform(get(API + "/authors/" + publishedAuthorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.books[*].isbn", hasItem("abcde1234")));

        MvcResult created = mockMvc.perform(post(API + "/authors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstname":"Test","lastname":"Author"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstname").value("Test"))
                .andReturn();
        int authorId = json(created).get("authorId").asInt();

        mockMvc.perform(put(API + "/authors/" + authorId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstname":"Updated","lastname":"Author"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authorId").value(authorId))
                .andExpect(jsonPath("$.firstname").value("Updated"));

        mockMvc.perform(get(API + "/authors/" + authorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname").value("Updated"));

        mockMvc.perform(get(API + "/authors/999999"))
                .andExpect(status().isNotFound());

        mockMvc.perform(put(API + "/authors/999999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstname":"Missing","lastname":"Author"}
                                """))
                .andExpect(status().isNotFound());
    }

    private JsonNode json(MvcResult response) throws Exception {
        return objectMapper.readTree(response.getResponse().getContentAsString());
    }
}
