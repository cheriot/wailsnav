package main

import (
	"context"
	"fmt"

	"github.com/cheriot/kubenav/pkg/app"
)

func main() {
	fmt.Println("debug this")
	kubectx := "kind-test-cluster"
	kubeCluster, err := app.GetOrMakeKubeCluster(context.Background(), kubectx)
	if err != nil {
		fmt.Printf("error getting cluster for name %s: %s", kubectx, err.Error())
		return
	}

	ns := "back-end"
	query := "all"
	resourceTables, err := kubeCluster.Query(context.Background(), ns, "all")
	if err != nil {
		fmt.Printf("error during query for %s %s %s: %s", kubectx, ns, query, err.Error())
		// return the tables. Maybe the error is for only one of them.
	}
	fmt.Printf("%+v", resourceTables)
}
