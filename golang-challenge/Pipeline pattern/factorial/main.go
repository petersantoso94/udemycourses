package main

import (
	"fmt"
)

func main() {
	f := factorial(gen())
	for total := range f {
		fmt.Println("Total:", total)
	}
}

func gen() <-chan int {
	out := make(chan int)
	go func() {
		for index := 0; index < 10; index++ {
			for y := 3; y < 12; y++ {
				out <- y
			}
		}
		close(out)
	}()
	return out
}

func factorial(in <-chan int) <-chan int {
	c := make(chan int)
	go func() {
		result := 1
		for n := range in {
			c <- fact(n)
		}
		c <- result
		close(c)
	}()
	return c
}

func fact(n int) int {
	total := 1
	for index := 1; index <= n; index++ {
		total *= index
	}
	return total
}
