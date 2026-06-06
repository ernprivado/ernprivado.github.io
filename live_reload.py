#!/usr/bin/env python3
"""Simple live reload helper for the portfolio site."""

from livereload import Server


def main() -> None:
    server = Server()

    # Watch core files for changes
    server.watch('index.html')
    server.watch('styles.css')
    server.watch('script.js')

    # Serve the current directory on port 8000
    print('Starting live reload server on http://127.0.0.1:8000')
    print('Open that URL in your browser and edit files to reload automatically.')
    server.serve(root='.', port=8000, host='127.0.0.1')


if __name__ == '__main__':
    main()
