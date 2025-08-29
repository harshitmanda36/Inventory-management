package com.example.inventory.controller;

import com.example.inventory.model.Item;
import com.example.inventory.repository.ItemRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<Item> all() {
        return itemRepository.findAll();
    }

    @PostMapping
    public Item create(@Valid @RequestBody Item item) {
        item.setUpdatedAt(Instant.now());
        return itemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable String id, @Valid @RequestBody Item item) {
        return itemRepository.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setSku(item.getSku());
                    existing.setQuantity(item.getQuantity());
                    existing.setPrice(item.getPrice());
                    existing.setDescription(item.getDescription());
                    existing.setUpdatedAt(Instant.now());
                    return ResponseEntity.ok(itemRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return itemRepository.findById(id)
                .map(existing -> {
                    itemRepository.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().<Void>build());
    }
}
