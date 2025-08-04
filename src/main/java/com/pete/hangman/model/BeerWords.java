package com.pete.hangman.model;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class BeerWords {
    private static final List<String> BEER_TYPES = Arrays.asList(
        "LAGER",
        "PILSNER",
        "STOUT",
        "PORTER",
        "ALE",
        "IPA",
        "WHEAT",
        "LAMBIC",
        "BOCK",
        "HEFEWEIZEN",
        "SAISON",
        "TRIPEL",
        "DUBBEL",
        "KOLSCH",
        "MARZEN",
        "DUNKEL",
        "WITBIER",
        "GOSE",
        "SOUR",
        "BARLEYWINE"
    );
    
    private static final Random random = new Random();
    
    public static String getRandomWord() {
        return BEER_TYPES.get(random.nextInt(BEER_TYPES.size()));
    }
}