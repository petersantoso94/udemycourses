package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"strings"
	"time"
)

type deck []string

func newDeck() deck {
	cards := deck{}
	cardSuites := []string{"Wajik", "Waru", "Hati", "Keriting"}
	cardValues := []string{"As", "Dua", "Tiga", "Empat"}
	for _, suite := range cardSuites {
		for _, val := range cardValues {
			cards = append(cards, val+" "+suite)
		}
	}

	return cards
}

func (d deck) draw(n int) (deck, deck) {
	remained := d[n:]
	drawed := d[:n]
	return remained, drawed
}

func (d deck) print() {
	for _, card := range d {
		fmt.Println(card)
	}
}

func (d deck) toString() string {
	return strings.Join(d, ",")
}

func convertToDeck(s string) deck {
	return strings.Split(s, ",")
}

func (d deck) saveToFile(fileName string) error {
	return ioutil.WriteFile(fileName, []byte(d.toString()), 0666)
}

func newDeckFromFile(fileName string) (deck, error) {
	byt, err := ioutil.ReadFile(fileName)
	if err != nil {
		return nil, err
	}
	return convertToDeck(string(byt)), nil
}

func (d deck) shuffle() {
	source := rand.NewSource(time.Now().UnixNano())
	rng := rand.New(source)
	for idx := range d {
		rands := rng.Intn(len(d) - 1)
		d[rands], d[idx] = d[idx], d[rands]
	}
}
