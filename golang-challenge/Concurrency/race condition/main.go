package main

import (
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
)

func main() {
	fmt.Println("CPUs\t\t", runtime.NumCPU())
	fmt.Println("Goroutines\t", runtime.NumGoroutine())
	var counter int64 = 0
	wg := sync.WaitGroup{}
	const gs = 100
	wg.Add(gs)

	//mutex
	var mu = sync.Mutex{}

	for i := 0; i < gs; i++ {
		go func() {
			mu.Lock()
			counter++
			atomic.AddInt64(&counter, 1)
			fmt.Println("Counter:\t\t", atomic.LoadInt64(&counter))
			mu.Unlock()
			wg.Done()
		}()
		fmt.Println("Goroutines\t", runtime.NumGoroutine())
	}
	wg.Wait()
	fmt.Println("Counter:\t\t", counter)
}
