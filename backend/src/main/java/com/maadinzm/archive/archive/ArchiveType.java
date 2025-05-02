package com.maadinzm.archive.archive;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum ArchiveType {
    OUTGOING("صادر"),
    INCOMING("وارد");

    private final String value;

    ArchiveType(String value) {
        this.value = value;
    }

    public static ArchiveType fromValue(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Archive type value cannot be null or empty");
        }
        return Arrays.stream(values())
                .filter(type -> type.getValue().equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid archive type: " + value));
    }

    public static boolean isValid(String value) {
        if (value == null || value.isEmpty()) {
            return false;
        }
        return Arrays.stream(values())
                .anyMatch(type -> type.getValue().equals(value));
    }

    @Override
    public String toString() {
        return this.value;
    }
}