package main

import (
	"fmt"
	"os"
	"testing"
)

func TestNewDeck(t *testing.T) {
	d := newDeck()
	expectedLen := 16
	f := "As Wajik"
	l := "Empat Keriting"
	if len(d) != expectedLen {
		t.Errorf("expected length of %d, but got  %d", expectedLen, len(d))
	}

	if d[0] != f {
		t.Errorf("expected %v, but got  %v", f, d[0])
	}

	if d[len(d)-1] != l {
		t.Errorf("expected %v, but got  %v", l, d[len(d)])
	}
}

func cleanFile(filename string) {
	os.Remove(filename)
}

func TestNewDeckFromFile(t *testing.T) {
	fileName := "_decktesting"

	cleanFile(fileName)
	test := newDeck()
	test.saveToFile(fileName)
	defer cleanFile(fileName)
	d, err := newDeckFromFile(fileName)
	if err != nil {
		fmt.Printf(err.Error())
		t.Errorf("Error while reading file: %v", err.Error())
	}
	expectedLen := 16
	f := "As Wajik"
	l := "Empat Keriting"
	if len(d) != expectedLen {
		t.Errorf("expected length of %d, but got  %d", expectedLen, len(d))
	}

	if d[0] != f {
		t.Errorf("expected %v, but got  %v", f, d[0])
	}

	if d[len(d)-1] != l {
		t.Errorf("expected %v, but got  %v", l, d[len(d)])
	}
}
